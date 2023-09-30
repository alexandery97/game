import java.util.Iterator;

@SuppressWarnings("unchecked")
public class DynamicArrayDeque<E> implements Deque<E> {
    private E[] data;
    private int f;
    private int size;
    private static final int capacity = 16;

    public DynamicArrayDeque() {
        this(capacity);
    }
    public DynamicArrayDeque(int capacity) {
        data = (E[]) new Object[capacity];
    }

    //TODO: implement DynamicArrayDeque
    //      in addFirst and addLast, resize when the array is full

    private void resize(int capacity) {
        //TODO: implement resize method
    }

    private class ArrayIterator implements Iterator<E> {
        int i;
        public ArrayIterator() {
            i = 0;
        }
        //TODO: implement ArrayIterator 
    }

    private static void onFalseThrow(boolean b) {
        if(!b)
            throw new RuntimeException("Error: unexpected");            
    }
    public static void main(String[] args) {
        DynamicArrayDeque<Integer> dq = new DynamicArrayDeque<>(1);

        for(int i : dq)
            onFalseThrow(false);
        onFalseThrow(dq.size() == 0);
        onFalseThrow(dq.isEmpty() == true);
        
        dq.addFirst(3);
        dq.addFirst(2);
        dq.addFirst(1);
        dq.addLast(4);
        dq.addLast(5);
        
        int j = 1;
        for(int i : dq)
            onFalseThrow(i == j++);
        onFalseThrow(dq.size() == 5);
        onFalseThrow(dq.isEmpty() == false);

        for(int i = 1; i <= 3; i++)
            onFalseThrow(i == dq.removeFirst());
        onFalseThrow(dq.removeLast() == 5);
        onFalseThrow(dq.removeLast() == 4);
        
        onFalseThrow(dq.size() == 0);
        onFalseThrow(dq.isEmpty() == true);
        
        System.out.println("Success!");           
    }
}
